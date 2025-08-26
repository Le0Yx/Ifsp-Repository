/*
 Programa para calculo de fatorial
 Feito em: 25/05/25
 Por: Leonardo Do Carmo Onofre 
 Prontuario: HT3055451
 */

import java.util.Scanner;

    public class  MediaIdades {
        public void idadesTurma(){
             float media;
             int soma, qntdAluno, idades;
             soma = 0;
             qntdAluno = 0;
             Scanner tec = new Scanner(System.in);

             System.out.println("Entre com o valor sua idade ou 0 para sair: ");
             idades = tec.nextInt();
             
             while ( idades != 0) {
                soma = soma + idades;       
                qntdAluno = qntdAluno + 1 ;

                System.out.print("Entre com o valor sua idade ou 0 para mostrar o resultado: ");
                idades = tec.nextInt();
            }

                    media = (float) soma / qntdAluno ;
                    System.out.printf("A media da idade eh: %.2f", media);

        }
    }