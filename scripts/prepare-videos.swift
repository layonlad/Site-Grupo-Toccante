// Converte os vídeos das pastas para MP4 (H.264/AAC, SDR BT.709, início rápido,
// sem metadados) e extrai um quadro de cada um em JPEG para servir de capa.
// Uso: swift scripts/prepare-videos.swift <pasta "Grupo Toccante"> <pasta de saída> [nome]
import AVFoundation
import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

struct Job {
  let name: String; let file: String; let poster: Double
  // Menor lado do vídeo e taxa de bits; nil usa o padrão (1080 px, 6 a 7,5 Mbps).
  var side: Double? = nil; var rate: Double? = nil
}
let jobs = [
  Job(name: "musical-video-1", file: "Musical/copy_F99B0F60-B9CF-4BA8-9B24-5E7336D4878F.mov", poster: 0.81),
  Job(name: "musical-video-2", file: "Musical/copy_23CBE21E-976F-43C8-BC8D-7160A56AE4DC.mov", poster: 0.55),
  Job(name: "musical-video-3", file: "Musical/copy_40925380-08B2-4620-82B0-3DCBC77C2107.mov", poster: 0.42),
  Job(name: "musical-video-4", file: "Musical/IMG_9869.MOV", poster: 0.55),
  Job(name: "buffet-video", file: "Buffet/IMG_0400.MOV", poster: 0.55),
  Job(name: "decoracao-video-1", file: "Decoração/IMG_0398.MOV", poster: 0.68),
  Job(name: "decoracao-video-2", file: "Decoração/IMG_0410.MOV", poster: 0.29),
  Job(name: "depoimento-felipe-samara", file: "Noivos/Depoimentos/Felipe e Samara/copy_D87A2649-7D33-40C2-A436-E4B6F55120ED.mov", poster: 0.81),
  Job(name: "depoimento-karen-joao", file: "Noivos/Depoimentos/Karen e João/IMG_0998.mov", poster: 0.16),
  // Abertura da marca: animação simples, cabe em 720p com taxa baixa.
  Job(name: "abertura-grupo-toccante", file: "Site-Grupo-Toccante/media-src/abertura-grupo-toccante-original.mp4", poster: 0.5, side: 720, rate: 1_400_000),
  Job(name: "depoimento-lais-lucas", file: "Noivos/Depoimentos/Laís e Lucas/IMG_0571.mov", poster: 0.42),
]
// Largura final de 1080 px; nunca amplia. Teto de bytes: abaixo de 100 MB (GitHub).
let targetWidth = 1080.0
let maxBytes = 88_000_000.0

func fail(_ text: String) -> Never { FileHandle.standardError.write(Data((text + "\n").utf8)); exit(1) }
func even(_ v: Double) -> Double { (v / 2).rounded() * 2 }

func convert(_ job: Job, _ input: URL, _ output: URL) async throws {
  let asset = AVURLAsset(url: input)
  let video = try await asset.loadTracks(withMediaType: .video)[0]
  let audio = try await asset.loadTracks(withMediaType: .audio).first
  let (size, transform, fps, rate) = try await video.load(.naturalSize, .preferredTransform, .nominalFrameRate, .estimatedDataRate)
  let duration = try await asset.load(.duration)
  let box = CGRect(origin: .zero, size: size).applying(transform)
  let w = abs(box.width), h = abs(box.height)
  let scale = min(1, (job.side ?? targetWidth) / min(w, h))
  let out = CGSize(width: even(w * scale), height: even(h * scale))
  let frames = Double(min(60, max(24, fps.rounded())))
  let budget = maxBytes * 8 / duration.seconds - 192_000
  let wanted = frames > 40 ? 7_500_000.0 : 6_000_000.0
  let bitrate = min(job.rate ?? wanted, budget, Double(rate) * 1.0)

  let comp = AVMutableVideoComposition()
  comp.renderSize = out
  comp.frameDuration = CMTime(value: 1, timescale: CMTimeScale(frames))
  comp.colorPrimaries = AVVideoColorPrimaries_ITU_R_709_2
  comp.colorTransferFunction = AVVideoTransferFunction_ITU_R_709_2
  comp.colorYCbCrMatrix = AVVideoYCbCrMatrix_ITU_R_709_2
  let ins = AVMutableVideoCompositionInstruction()
  ins.timeRange = CMTimeRange(start: .zero, duration: duration)
  let layer = AVMutableVideoCompositionLayerInstruction(assetTrack: video)
  layer.setTransform(
    transform.concatenating(CGAffineTransform(translationX: -box.minX, y: -box.minY))
      .concatenating(CGAffineTransform(scaleX: out.width / w, y: out.height / h)), at: .zero)
  ins.layerInstructions = [layer]
  comp.instructions = [ins]

  let reader = try AVAssetReader(asset: asset)
  let vOut = AVAssetReaderVideoCompositionOutput(
    videoTracks: [video],
    videoSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange])
  vOut.videoComposition = comp
  reader.add(vOut)
  var aOut: AVAssetReaderTrackOutput?
  if let audio {
    let o = AVAssetReaderTrackOutput(track: audio, outputSettings: [
      AVFormatIDKey: kAudioFormatLinearPCM, AVLinearPCMBitDepthKey: 16, AVLinearPCMIsFloatKey: false,
      AVLinearPCMIsBigEndianKey: false, AVLinearPCMIsNonInterleaved: false,
      AVSampleRateKey: 48000, AVNumberOfChannelsKey: 2])
    reader.add(o); aOut = o
  }
  try? FileManager.default.removeItem(at: output)
  let writer = try AVAssetWriter(outputURL: output, fileType: .mp4)
  writer.shouldOptimizeForNetworkUse = true
  writer.metadata = []
  let vIn = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: Int(out.width), AVVideoHeightKey: Int(out.height),
    AVVideoColorPropertiesKey: [
      AVVideoColorPrimariesKey: AVVideoColorPrimaries_ITU_R_709_2,
      AVVideoTransferFunctionKey: AVVideoTransferFunction_ITU_R_709_2,
      AVVideoYCbCrMatrixKey: AVVideoYCbCrMatrix_ITU_R_709_2],
    AVVideoCompressionPropertiesKey: [
      AVVideoAverageBitRateKey: Int(bitrate), AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
      AVVideoH264EntropyModeKey: AVVideoH264EntropyModeCABAC, AVVideoMaxKeyFrameIntervalDurationKey: 2,
      AVVideoExpectedSourceFrameRateKey: Int(frames)]])
  vIn.expectsMediaDataInRealTime = false
  writer.add(vIn)
  var aIn: AVAssetWriterInput?
  if aOut != nil {
    let i = AVAssetWriterInput(mediaType: .audio, outputSettings: [
      AVFormatIDKey: kAudioFormatMPEG4AAC, AVSampleRateKey: 48000, AVNumberOfChannelsKey: 2, AVEncoderBitRateKey: 160_000])
    i.expectsMediaDataInRealTime = false
    writer.add(i); aIn = i
  }
  guard reader.startReading() else { throw reader.error! }
  guard writer.startWriting() else { throw writer.error! }
  writer.startSession(atSourceTime: .zero)
  func pump(_ input: AVAssetWriterInput, _ source: AVAssetReaderOutput, _ label: String) async {
    await withCheckedContinuation { (c: CheckedContinuation<Void, Never>) in
      var done = false
      input.requestMediaDataWhenReady(on: DispatchQueue(label: label)) {
        while input.isReadyForMoreMediaData && !done {
          if let sample = source.copyNextSampleBuffer() { if !input.append(sample) { done = true } } else { done = true }
        }
        if done { input.markAsFinished(); c.resume() }
      }
    }
  }
  async let v: Void = pump(vIn, vOut, "v")
  if let aIn, let aOut { async let a: Void = pump(aIn, aOut, "a"); await a }
  await v
  if reader.status == .failed { throw reader.error! }
  await writer.finishWriting()
  if writer.status != .completed { throw writer.error ?? NSError(domain: "writer", code: 1) }
  let bytes = (try FileManager.default.attributesOfItem(atPath: output.path)[.size] as! NSNumber).intValue
  print("\(job.name) \(Int(out.width))x\(Int(out.height)) \(Int(frames))fps \(String(format: "%.1f", duration.seconds))s \(bytes / 1_000_000)MB")
}

func frame(_ input: URL, at fraction: Double, _ output: URL) async throws {
  let asset = AVURLAsset(url: input)
  let g = AVAssetImageGenerator(asset: asset)
  g.appliesPreferredTrackTransform = true
  g.requestedTimeToleranceBefore = .zero
  g.requestedTimeToleranceAfter = .zero
  let d = try await asset.load(.duration)
  let image = try await g.image(at: CMTime(seconds: d.seconds * fraction, preferredTimescale: 600)).image
  let dest = CGImageDestinationCreateWithURL(output as CFURL, UTType.jpeg.identifier as CFString, 1, nil)!
  CGImageDestinationAddImage(dest, image, [kCGImageDestinationLossyCompressionQuality: 0.95] as CFDictionary)
  if !CGImageDestinationFinalize(dest) { fail("Capa não gravada: \(output.path)") }
}

let args = CommandLine.arguments
guard args.count >= 3 else { fail("Uso: swift prepare-videos.swift <origem> <saída> [nome | quadros]") }
let root = URL(fileURLWithPath: args[1]), outDir = URL(fileURLWithPath: args[2])
let only = args.count > 3 ? args[3] : nil
let semaphore = DispatchSemaphore(value: 0)
Task {
  do {
    for job in jobs where only == nil || only == job.name || only == "quadros" {
      let input = root.appendingPathComponent(job.file)
      if only == "quadros" {
        for i in 0..<8 {
          try await frame(input, at: 0.03 + Double(i) * 0.13, outDir.appendingPathComponent("\(job.name)_\(i).jpg"))
        }
      } else {
        try await convert(job, input, outDir.appendingPathComponent("\(job.name).mp4"))
        try await frame(outDir.appendingPathComponent("\(job.name).mp4"), at: job.poster, outDir.appendingPathComponent("\(job.name)-poster.jpg"))
      }
    }
  } catch { fail("Erro: \(error)") }
  semaphore.signal()
}
semaphore.wait()
