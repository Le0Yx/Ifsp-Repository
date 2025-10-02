public class Vetor {

    public void mostrarVetor() {
        int[] v = {2, 4, 5, 6, 8};

        System.out.printf("%s%10s\n", "indice", "Valor");

        for (int i = 0; i < v.length; i++) {
            System.out.printf("%4d%12d\n", i, v[i]);
        }
    }
}