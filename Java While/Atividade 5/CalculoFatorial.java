/*
 Programa para calculo de fatorial
 Feito em: 25/05/25
 Por: Leonardo Do Carmo Onofre 
 Prontuario: HT3055451
 */
import java.util.Scanner;

public class CalculoFatorial{
    public void calculadoraFatorial(){
        int cont , n;
        cont = 1;
        double fatorial;
        fatorial = 1;
        
        Scanner key;
        key = new Scanner(System.in);

        System.out.println("Qual seria o numero?: ");
        n = key.nextInt();

        while (cont <= n) { 
            fatorial = fatorial * cont; 
            cont = cont + 1; 
            

        }  
        
        System.out.printf("O seu resultado seria: %.2f", fatorial);

    }
}