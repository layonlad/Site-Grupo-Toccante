from pathlib import Path
from PIL import Image,ImageOps,ImageFilter
from fontTools import subset
from fontTools.ttLib import TTFont
import re,json
root=Path(__file__).resolve().parents[1]
source=root.parent/'review/materials/selected'; out=root/'public/media';out.mkdir(exist_ok=True)
choices=['decoracao-mesa-bolo','decoracao-flores-corredor','buffet-salgados','buffet-mesa-mineira','buffet-doces','buffet-docinhos','buffet-massas','equipe-buffet','musical-teclado','musical-violino','musical-sax']
manifest={}
for name in choices:
 p=source/(name+'.jpg');im=ImageOps.exif_transpose(Image.open(p)).convert('RGB')
 # Existing black letterbox on this photograph is cropped geometrically only.
 if name=='buffet-doces': im=im.crop((0,98,im.width,im.height-90))
 widths=sorted(set(min(w,im.width) for w in [400,800,1440]))
 files=[]
 for w in widths:
  photo=im.resize((w,round(im.height*w/im.width)),Image.Resampling.LANCZOS)
  if w<im.width: photo=photo.filter(ImageFilter.UnsharpMask(radius=.6,percent=45,threshold=3))
  dest=out/f'{name}-{w}.webp';photo.save(dest,'WEBP',quality=85,method=6);files.append({'src':'/media/'+dest.name,'width':w,'height':photo.height,'bytes':dest.stat().st_size})
 manifest[name]={'width':im.width,'height':im.height,'files':files}
(root/'app/media.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
for name in ['EBGaramond','Lato-Regular','Lato-Bold']:
 font=TTFont(root/f'public/fonts/{name}.ttf');opt=subset.Options();opt.flavor='woff2';ss=subset.Subsetter(options=opt);ss.populate(unicodes=list(range(0x20,0x250))+list(range(0x2000,0x2070))+[0x2192,0x2190,0x2713]);ss.subset(font);font.flavor='woff2';font.save(root/f'public/fonts/{name}.woff2')
# Reuse the supplied SVG paths/mask as a static logo, without redrawing them.
html=(root.parent.parent/'toccante-abertura-site.html').read_text();svg=re.search(r'(<svg class="tg-logo"[\s\S]+?</svg>)',html).group(1);defs=re.search(r'<defs>[\s\S]+?</defs>',svg).group(0)
(root/'public/brand.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="236 206 608 660">'+defs+'<use href="#tgFull"/></svg>')
print(json.dumps({'images':len(manifest),'responsive_files':sum(len(v['files']) for v in manifest.values()),'total_image_bytes':sum(f['bytes'] for v in manifest.values() for f in v['files'])}))
