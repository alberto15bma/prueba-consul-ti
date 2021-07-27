package alberto.arias.pruebafin.Repositories;

import alberto.arias.pruebafin.Modelos.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Usuario findByUsuario(String usuario);
}

