package alberto.arias.pruebafin.Modelos;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Data
@Entity
@Table(name="usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    private String usuario;
    private String password;
    private String rol;
    @Column(name = "fecha_creacion")
    private Timestamp fechaCreacion;
    private String estado;
    @OneToMany
    //@JoinColumn(name = "evento_id")
    private List<Comentario> comentarios;
}
