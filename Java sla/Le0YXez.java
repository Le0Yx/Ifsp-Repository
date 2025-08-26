import java.util.Scanner;

    public class Le0YXez{
        public static void main(String[]args){
            float mediaidades;
            int qntd, soma, idades;
            soma = 0;
            qntd = 0;
            Scanner tec = new Scanner(System.in);

            System.out.println("Fala a porra da sua idade ou sai com 0");
            idades = tec.nextInt();

            while(idades != 0) {
                soma = soma + idades;
                qntd = qntd + 1;

                System.out.println("Digite a proxima idades ou 0 para resultado");
                idades = tec.nextInt();
            }

                mediaidades = (float) soma / qntd;
                System.out.printf("A media das idades eh: %.2f", mediaidades);
        }
    }