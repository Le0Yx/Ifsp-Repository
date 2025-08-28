import java.util.Scanner;

    public class Explicacaonaur{
        public static void main(String[] args) {
            Scanner tec = new Scanner(System.in);
            int opcao;

            do {
                
                System.out.println("1 - play");
                System.out.println("2 - pontuacao");
                System.out.println("3 - configuracoes");
                System.out.println("4 - sair");
                opcao = tec.nextInt();

                switch (opcao) {
                    case 1:
                        System.out.println("Voce esta jogando");
                        break;
                    case 2:
                        System.out.println("Sua pontuacao eh: ");
                        break;
                    case 3:
                        System.out.println("Voce esta configurando");
                        break;
                    
                }
            

            } while (opcao != 4);

        }
    }
        
    
    