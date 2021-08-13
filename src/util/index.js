export function moneyFormat(price, sign = 'Rp') {
  const pieces = parseFloat(price).toFixed(2).split('');
  let ii = pieces.length - 3;
  while ((ii -= 3) > 0) {
    pieces.splice(ii, 0, '.');
  }
  let changeFormat = JSON.stringify(sign + pieces.join(''));
  changeFormat = changeFormat.slice(0, -4);
  changeFormat = changeFormat.slice(1);
  return changeFormat;
}

export function dateFormat(tgl) {
  var D = tgl.toString().split('-');
  var month = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  return D[2].slice(0, 2) + ' ' + month[Number(D[1]) - 1] + ' ' + D[0];
}
