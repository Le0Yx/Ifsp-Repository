import java.util.Scanner;

public class WhileCalculo {

    public void whileMedia() {
        float prova, atvd, trbl, media, mediaMaior = -1, mediaMenor = 11, somaMedias = 0, mediaDaTurma;
        int qntdAlunos = 0;

        Scanner tec = new Scanner(System.in);

        System.out.println("Entre com a nota da prova (ou -1 para sair):");
        prova = tec.nextFloat();

        while (prova != -1) {
            System.out.println("Entre com a nota das atividades:");
            atvd = tec.nextFloat();

            System.out.println("Entre com a nota do trabalho:");
            trbl = tec.nextFloat();

            media = (prova + trbl + atvd) / 3;
            System.out.printf("Sua média é: %.2f\n", media);

                if (media > mediaMaior) {
                    mediaMaior = media;
                }
                if (media < mediaMenor) {
                    mediaMenor = media;
                }
            
            somaMedias += media;
            qntdAlunos++;

            System.out.println("\nEntre com a nota da próxima prova (ou -1 para mostrar resultado):");
            prova = tec.nextFloat();
        }
        if (qntdAlunos > 0) {
            mediaDaTurma = somaMedias / qntdAlunos;
            System.out.printf("A maior média da turma foi: %.2f\n", mediaMaior);
            System.out.printf("A menor média da turma foi: %.2f\n", mediaMenor);
            System.out.printf("A média geral da turma foi: %.2f\n", mediaDaTurma);
        } else {
            System.out.println("Nenhum aluno foi processado.");
        }
    }
}