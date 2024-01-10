// Application Extension
export interface Application {
  identifier: string
  code: string
  data: number[]
}

// Graphic Control Extension
export interface GraphicControl {
  delayTime: number // unit: 10ms
  transparentIndex: number
  // ↓ <Packed Fields>
  reserved: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  disposal: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  userInput: boolean
  transparent: boolean
  // ↑ <Packed Fields>
}

// Comment Extension
export type Comment = string

// Plain Text Extension
export interface PlainText {
  left: number
  top: number
  width: number
  height: number
  cellWidth: number
  cellHeight: number
  colorIndex: number
  backgroundColorIndex: number
  data: number[]
}

// Image Descriptor
export interface Frame {
  left: number
  top: number
  width: number
  height: number
  // ↓ <Packed Fields>
  localColorTable: boolean
  interlaced: boolean
  reserved: 0 | 1 | 2 | 3
  colorTableSorted: boolean
  colorTableSize: number
  // ↑ <Packed Fields>

  // Local Color Table - [r, g, b][]
  colorTable?: number[][]

  // LZW Minimum Code Size
  lzwMinCodeSize: number

  // Image Data - [begin, length][]
  dataPositions: number[][]

  // Extensions (89a)
  application?: Application
  graphicControl?: GraphicControl
  comment?: Comment
  plainText?: PlainText

  // Custom fields
  index: number
  delay: number // unit: 1ms
  disposal: GraphicControl['disposal']
}

export interface Gif87a {
  // Logical Screen Descriptor
  width: number
  height: number
  // ↓ <Packed Fields>
  globalColorTable: boolean
  colorResoluTion: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  colorTableSorted: boolean
  colorTableSize: number
  // ↑ <Packed Fields>
  backgroundColorIndex: number
  pixelAspectRatio: number

  // Global Color Table
  colorTable?: number[][]

  // Image Descriptor
  frames: Frame[]
}

export interface Gif89a extends Gif87a {
  // Application Extension
  // NETSCAPE2.0
  looped?: boolean
  loopCount?: number
}

export interface Gif extends Gif89a {
  version: '89a' | '87a'
}

export type GifEncodeFrameOptions<T = CanvasImageSource | BufferSource | string> = Partial<Frame> & {
  /** Frame image data */
  data: T
}

export type GifEncoderOptions = Omit<Partial<Gif>, 'frames'> & {
  /** Enable debug mode to view the execution time log. */
  debug?: boolean
  /** Worker script url */
  workerUrl?: string
  /** Worker number */
  workerNumber?: number
  /** Max colors count 2-255 */
  maxColors?: number
}

export type GifEncodeOptions<T = CanvasImageSource | BufferSource | string> = GifEncoderOptions & {
  frames: GifEncodeFrameOptions<T>[]

  format?: 'arrayBuffer' | 'blob'
}
