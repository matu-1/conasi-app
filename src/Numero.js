class Numero {
  constructor(n) {
    this.n = n;
  }

  getNumero() {
    return this.n;
  }

  setNumero(n) {
    this.n = n;
  }

  sumarDigitos() {
    var n = this.n,
      suma = 0,
      d;
    while (n > 0) {
      d = n % 10;
      n = Math.trunc(n / 10);
      suma = suma + d;
    }
    return suma;
  }

  invertir() {
    var d;
    var na = this.n,
      resultado = 0;
    while (na > 0) {
      d = na % 10;
      na = Math.trunc(na / 10);
      resultado = resultado * 10 + d;
    }
    return resultado;
  }

  eliminarNumero(nn, x) {
    var n = nn,
      d,
      resultado = 0;
    var e = true;
    while (n > 0) {
      d = n % 10;
      n = Math.trunc(n / 10);
      if (d == x && e == true) {
        e = false;
      } else {
        resultado = resultado * 10 + d;
      }
    }
    return resultado;
  }

  numeroMayor(nn) {
    var d,
      d1 = nn % 10,
      n = nn;
    while (n > 0) {
      d = n % 10;
      n = Math.trunc(n / 10);
      if (d >= d1) {
        d1 = d;
      }
    }
    return d1;
  }

  ordenarNumero() {
    var n = this.n;
    var resultado = 0,
      indice = 0;
    while (n > 0) {
      var d = this.numeroMayor(n);
      n = this.eliminarNumero(n, d);
      resultado = d * Math.pow(10, indice) + resultado;
      indice++;
    }
    return resultado;
  }
}

export {Numero};

// var numero = new Numero(966551682);
// console.warn('ordenado: ', numero.ordenarNumero());
