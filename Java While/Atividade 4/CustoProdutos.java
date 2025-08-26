/*
 Programa para calculo de fatorial
 Feito em: 25/05/25
 Por: Leonardo Do Carmo Onofre 
 Prontuario: HT3055451
 */

import java.util.Scanner;

    public class  CustoProdutos {
        public void custoLoja(){
             float total, preco, soma;
             int produtos , qntd;
             total = 0;
             produtos = 1;
             Scanner tec = new Scanner(System.in);

             while ( produtos <= 5) {

                System.out.println("Entre com o preco de cada um: ");
                preco = tec.nextFloat();

                System.out.println("Entre com a quantidade: ");
                qntd = tec.nextInt();

                soma = preco * qntd;

                total = total + soma;

                produtos = produtos + 1;
  
             }

                    System.out.printf("O preco total eh: %.2f", total);

        }
    }
