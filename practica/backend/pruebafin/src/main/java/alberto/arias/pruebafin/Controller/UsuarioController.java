package alberto.arias.pruebafin.Controller;

import alberto.arias.pruebafin.Modelos.Usuario;
import alberto.arias.pruebafin.Services.UsuarioService;
import alberto.arias.pruebafin.Sistema.Respuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;

    @PostMapping(path = "/login")
    public ResponseEntity<Respuesta> login(@RequestBody Usuario usuario){
        return usuarioService.login(usuario);
    }

    @GetMapping(path = "/usuario/listar")
    public List<Usuario> lista(){
        return usuarioService.lista();
    }
    @PostMapping(path = "/usuario/crear")
    public Usuario crearUsuario(@RequestBody Usuario usuario){
        return usuarioService.crearUsuario(usuario);
    }
    @PostMapping(path = "/usuario/editar")
    public ResponseEntity<Usuario> actualizarUsuario(@RequestBody Usuario usuario){
        return usuarioService.actualizarUsuario(usuario);
    }
    @PostMapping(path = "/usuario/eliminar")
    public ResponseEntity<String> eliminararUsuario(@RequestParam Integer idUsuario){
        return usuarioService.eliminarUsuario(idUsuario);
    }
}

