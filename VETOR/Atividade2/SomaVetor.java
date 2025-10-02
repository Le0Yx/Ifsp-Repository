public class SomaVetor {
    
    int v[] = new int[5];

    public void inicializa() {

        for (int i = 0; i < v.length; i++) {
            v [i] = i * 2;
        }
    }
    public void mostrar() {
        System.out.printf("%s%10s\n", "indice", "Valor");

        for (int i = 0; i < v.length; i++) {
            System.out.printf("%4d%12d\n", i, v[i]);
        }
    }
    public void mostrarSomaElemento() {
        int soma = 0;

        for (int numero : v) {
            soma = soma + numero;
        }

        System.out.println("\nA soma dos vetores eh:" + soma);
    }
}

