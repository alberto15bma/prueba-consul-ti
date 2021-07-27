package alberto.arias.pruebafin.Modelos;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name="comentario")
public class Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String comentario;
    private Date fecha;
    @ManyToOne
    //@JoinColumn(name = "evento_id")
    private Usuario usuario;
}
