import java.util.Scanner;

    public class WhileCalculo{
        public void whileMedia(){
            float prova = 0, atvd = 0, trbl = 0, media, qntdalunos = 0;
            Scanner tec = new Scanner(System.in);

            System.out.println("Entre com a nota da prova ou 0 para sair");
            prova = tec.nextFloat();

            while (prova != 0) {
                
                System.out.println("entre com a nota das ativdades ou 0 para o resultado");
                atvd = tec.nextFloat();

                System.out.println("entre com a nota do trbl ou 0 para o resultado");
                trbl = tec.nextFloat();

                media = (prova + trabalho + atvd) / 3;

                System.out.printf("Sua media eh: %.2f", media);
            }
        }
    }