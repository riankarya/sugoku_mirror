export default function valid(arrSudoku) {
  return cekBaris(arrSudoku) && cekKolom(arrSudoku) && cekKotak(arrSudoku)
}
function cekBaris(arrSudoku) {
  let baris = true
  for (let i = 0; i <= 8; i++) {
    let tampung = []
    for (let j = 0; j <= 8; j++) {
      if (tampung.includes(arrSudoku[i][j])) {
        baris = false
      }
      if (arrSudoku[i][j] != null) {
        tampung.push(arrSudoku[i][j])
      }
    }
  }
  console.log(baris)
  return baris
}
function cekKolom(arrSudoku) {
  let kolom = true
  for (let i = 0; i <= 8; i++) {
    let tampung = []
    for (let j = 0; j <= 8; j++) {
      if (tampung.includes(arrSudoku[j][i])) {
        kolom = false
        return kolom
      }
      if (arrSudoku[j][i] != null) {
        tampung.push(arrSudoku[j][i])
      }
    }
  }
  return kolom
}
function cekKotak(arrSudoku) {
  const arrKotak = [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2]
  ]
  let kotak = true
  for (let y = 0; y <= 8; y += 3) {
    for (let x = 0; x <= 8; x += 3) {
      let tampung = []
      for (let i = 0; i <= 8; i++) {
        let coordinates = [...arrKotak[i]]
        coordinates[0] += y
        coordinates[1] += x
        if (tampung.includes(arrSudoku[coordinates[0]][coordinates[1]])) {
          kotak = false
          return kotak
        }
        if (arrSudoku[coordinates[0]][coordinates[1]] != null) {
          tampung.push(arrSudoku[coordinates[0]][coordinates[1]])
        }
      }
    }
  }
  return kotak
}