import java.util.Scanner;

    public class DoWhile {
        public static void main(String[] args) {
            Scanner tec = new Scanner(System.in);
            int opcao1, idade, opcao, qntdpessoas = 0;
            float mediaIdade;


            do {

                System.out.println("\nQuantos anos voce tem?");
                idade = tec.nextInt();

                System.out.println("\n----Escolha uma opcao e ira descobrir seu destinos----");
                System.out.println("1. opcao 1");
                System.out.println("2. opcao 2");
                System.out.println("3. opcao 3");
                System.out.println("4. opcao 4\n");
                opcao = tec.nextInt();

                qntdpessoas++;

                switch(opcao) {
                    case 1:
                        System.out.println("Voce escolheu a opcao 1\n");
                        System.out.println("\n1. Porto das Areias\n" + //
                                                        "O sol nascia devagar sobre o mar, tingindo o porto com tons dourados. Porto das Areias já estava desperto: pescadores voltavam do mar, caminhões carregados de café seguiam para os armazéns, e o som dos guindastes ecoava pelo cais. No bairro antigo, as ruas de pedra eram um labirinto de histórias — casarões coloniais dividiam espaço com cafés boêmios, onde artistas e estudantes discutiam política. Mas bastava atravessar a avenida principal para ver o outro lado da cidade: arranha-céus reluzentes, turistas nas praias privadas e uma promessa de progresso que nem sempre incluía todos. Enquanto a cidade crescia para cima e para fora, o passado e o futuro brigavam em silêncio, refletidos no mesmo mar.");
                        System.out.println("Esse foi seu destino");
                        break;
                    case 2:
                        System.out.println("Voce escoleu a opcao 2\n");
                        System.out.println("\n2. San Vítor\n" + //
                                                        "San Vítor parecia esquecido pelo tempo. No alto da cordilheira, as casas de pedra se espalhavam como se tivessem brotado do chão, e o vento frio cantava pelos becos estreitos. Os moradores, com suas roupas grossas de lã, viviam da criação de lhamas e da venda de tapeçarias coloridas para os poucos viajantes que se aventuravam até ali. No topo do penhasco, o mosteiro de San Vítor observava tudo, suas paredes centenárias tingidas de musgo e silêncio. Diziam que nas cavernas próximas havia pinturas tão antigas quanto os primeiros homens, mas ninguém sabia ao certo — ou não queria falar sobre isso. À noite, a lua prateava as montanhas, e o vilarejo parecia um ponto de luz perdido na imensidão escura.");
                        System.out.println("Esse foi seu destino");
                        break;
                    case 3:
                        System.out.println("Voce escolheu a opcao 3\n");
                        System.out.println("\n3. Jardim das Torres\n" + //
                                                        "O ônibus balançava pelas ruas esburacadas enquanto a cidade, lá ao fundo, brilhava com seus prédios iluminados. No Jardim das Torres, a vida tinha outro ritmo. Crianças corriam pelo campinho de terra batida, onde uma trave improvisada era o centro do mundo. Paredes grafitadas contavam histórias de resistência, amor e raiva, colorindo os blocos cinzentos dos prédios populares. Dona Rita, com seu carrinho de pastel, sabia o nome de todo mundo e mantinha o sorriso mesmo quando a chuva de verão alagava a rua principal. Havia problemas, sim — transporte que nunca chegava, promessas políticas esquecidas — mas havia também música nos becos, arte nas paredes e uma vontade teimosa de melhorar o amanhã.");
                        System.out.println("Esse foi seu destino");
                        break;
                    case 4:
                        System.out.println("Voce escolheu a opcao 4(sair/resultado)\n");
                        break;
                    default:
                        System.out.println("opcao invalida\n");
                        break;
                }

            }while(opcao != 4);

            mediaIdade = (float) idade / qntdpessoas;

            System.out.printf("Quantidade de pessoas que jogaram o jogo: %d Media de idades dos jogadores: %.2f", qntdpessoas, mediaIdade);
        }
    }