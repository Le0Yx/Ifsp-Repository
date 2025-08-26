/* programa que mostra qualqueer tabuada
 * feito por Carlos ht3049159
 */

import java.util.Scanner;

public class Tabuada{
    public void mostrarTabuada(){
        Scanner tec = new Scanner(System.in);
        int NTabuada, tabuada, n, NF, n1;
        n = 0;

        System.out.println("Qual a tabuada você deseja saber? ");
        NTabuada = tec.nextInt();

        System.out.println("Ate qual numero você quer a tabuada? ");
        NF= tec.nextInt();

        tabuada = NTabuada * NF;
        n1 = NTabuada;

        while(NTabuada <= tabuada){
            n = n + 1;
            System.out.printf("%d X %d = %d",n1, n, NTabuada);
            System.out.println("");
            NTabuada = NTabuada + n1;
        }
    }
}