/* desafio da sequencia de fibonacci
 * feito por Carlos ht3049159
 */

import java.util.Scanner;
public class SequênciaDeFibonacci{
    public void mostrarSequênciaDeFibonacci(){
        Scanner tec = new Scanner(System.in);
        int ne, ns, nsA;
        ns = 0;
        nsA = 1;

        System.out.println("Qual o numero escolhido por você? ");
        ne = tec.nextInt();

        while(ne > ns){
            nsA = nsA + ns;
            System.out.println("" + ns);
            if(nsA<ne){
            System.out.println("" + nsA);
            }
            else{
                System.out.println("");
            }  
             ns = ns + nsA;
        }
            
        }

  }