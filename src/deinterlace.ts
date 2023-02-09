/**
 * Deinterlace function from https://github.com/shachaf/jsgif
 */
export function deinterlace(pixels: number[], width: number) {
  const newPixels = new Array(pixels.length)
  const rows = pixels.length / width
  const cpRow = function (toRow: number, fromRow: number) {
    const fromPixels = pixels.slice(fromRow * width, (fromRow + 1) * width)
    // @ts-expect-error concat
    // eslint-disable-next-line prefer-spread
    newPixels.splice.apply(newPixels, [toRow * width, width].concat(fromPixels))
  }

  // See appendix E.
  const offsets = [0, 4, 2, 1]
  const steps = [8, 8, 4, 2]

  let fromRow = 0
  for (let pass = 0; pass < 4; pass++) {
    for (let toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
      cpRow(toRow, fromRow)
      fromRow++
    }
  }

  return newPixels
}
