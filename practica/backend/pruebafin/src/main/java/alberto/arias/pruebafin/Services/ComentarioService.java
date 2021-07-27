package alberto.arias.pruebafin.Services;


import alberto.arias.pruebafin.Modelos.Comentario;
import alberto.arias.pruebafin.Modelos.Usuario;
import alberto.arias.pruebafin.Repositories.ComentarioRepository;
import alberto.arias.pruebafin.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ComentarioService {
    @Autowired
    ComentarioRepository comentarioRepository;
    @Autowired
    UsuarioRepository usuarioRepository;

    public List<Comentario> lista() {
        return  comentarioRepository.findAll();
    }
    public List<Comentario> listaPorUsuario(Integer idUsuario) {
        return  comentarioRepository.findAll().stream().filter(x->x.getUsuario().getId() == idUsuario).collect(Collectors.toList());
    }
    public Comentario crearComentario(Comentario comentario){
        comentario.setFecha(new Date());
        comentario.setUsuario(usuarioRepository.getById(comentario.getUsuario().getId()));
        return comentarioRepository.save(comentario);
    }
    public ResponseEntity<Comentario> actualizarComentario(Comentario comentario){
        final Optional<Comentario> coment = comentarioRepository.findById(comentario.getId());
        if (coment.isPresent()){

            Comentario com = coment.get();
            com.setComentario(comentario.getComentario() == null ?  "" : comentario.getComentario().toString());
            com.setFecha(new Date());
            return new ResponseEntity<>(comentarioRepository.save(com), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    public ResponseEntity<String> eliminarComentario(Integer idComentario){
        try {
            comentarioRepository.deleteById(idComentario);
            return new ResponseEntity<>("Registro eliminado correctamente", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al eliminar", HttpStatus.OK);
        }
    }
}
