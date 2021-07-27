package alberto.arias.pruebafin.Services;

import alberto.arias.pruebafin.Modelos.Usuario;
import alberto.arias.pruebafin.Repositories.UsuarioRepository;
import alberto.arias.pruebafin.Sistema.Respuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {
    @Autowired
    UsuarioRepository usuarioRepository;

    public ResponseEntity<Respuesta> login(Usuario user){
        Respuesta respuesta = new Respuesta();
        Usuario usuario = usuarioRepository.findByUsuario(user.getUsuario());
        if (usuario != null){
            if (usuario.getPassword().equals(user.getPassword())){
                respuesta.setData(usuario);
                respuesta.setCodigo(HttpStatus.OK.value());
                respuesta.setMensaje("Usuario encontrado");
                return new ResponseEntity<>(respuesta, HttpStatus.OK);
            }
        }
        respuesta.setData(null);
        respuesta.setCodigo(HttpStatus.OK.value());
        respuesta.setMensaje("Credenciales incorrectas");
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }
    public List<Usuario> lista() {
        return  usuarioRepository.findAll().stream().filter(a->a.getEstado().equals("Activo")).collect(Collectors.toList());
    }

    public Usuario crearUsuario(Usuario usuarios){
        usuarios.setEstado("Activo");
        return usuarioRepository.save(usuarios);
    }

    public ResponseEntity<Usuario> actualizarUsuario(Usuario usuarios){
        final Optional<Usuario> usuario = usuarioRepository.findById(usuarios.getId());
        if (usuario.isPresent()){
            Usuario user = usuario.get();
            user.setNombre(usuarios.getNombre() == null ?  "" : usuarios.getNombre().toString());
            user.setUsuario(usuarios.getUsuario() == null ?  "" : usuarios.getUsuario().toString());
            user.setRol(usuarios.getRol() == null ?  "" : usuarios.getRol().toString());
            return new ResponseEntity<>(usuarioRepository.save(user), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    public ResponseEntity<String> eliminarUsuario(Integer idUsuario){
        try {
            final Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);
            usuario.get().setEstado("Eliminado");
            actualizarUsuario(usuario.get());
            return new ResponseEntity<>("Registro eliminado correctamente", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al eliminar", HttpStatus.OK);
        }
    }

}