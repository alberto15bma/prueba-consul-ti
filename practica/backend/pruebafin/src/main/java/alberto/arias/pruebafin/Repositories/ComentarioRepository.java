package alberto.arias.pruebafin.Repositories;

import alberto.arias.pruebafin.Modelos.Comentario;
import alberto.arias.pruebafin.Modelos.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
}
