import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class main {
    public static void main(String[] args){
        ejercicio1();
    }

    private static void ejercicio1(){
        //int[] lista = new int[]{7,10,0,9,11,0,7};
        List<Integer> lista = Arrays.asList(7,10,0,9,11,0,7);
        List<Integer> lista_izquierda = new ArrayList<>();
        List<Integer> lista_ceros = new ArrayList<>();

        lista.forEach(e-> {
            if (e == 0){
                lista_ceros.add(e);
            }else {
                lista_izquierda.add(e);
            }
        });
        lista_izquierda.addAll(lista_ceros);

        System.out.println("Lista original");
        System.out.println(lista);

        System.out.println("Lista final");
        System.out.println(lista_izquierda);
    }
}
