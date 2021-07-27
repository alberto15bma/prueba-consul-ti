package alberto.arias.pruebafin.Controller;

import alberto.arias.pruebafin.Modelos.Comentario;
import alberto.arias.pruebafin.Modelos.Usuario;
import alberto.arias.pruebafin.Services.ComentarioService;
import alberto.arias.pruebafin.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class ComentarioController {
    @Autowired
    ComentarioService comentarioService;


    @GetMapping(path = "/comentario/listar")
    public List<Comentario> listaGeneral(){
        return comentarioService.lista();
    }
    @GetMapping(path = "/comentario/listar_por_usuario/{usuario_id}")
    public List<Comentario> listaGeneralPorUsuario(@PathVariable("usuario_id") Integer usuario_id){
        return comentarioService.listaPorUsuario(usuario_id);
    }
    @PostMapping(path = "/comentario/crear")
    public Comentario crearComentario(@RequestBody Comentario comentario){
        return comentarioService.crearComentario(comentario);
    }
    @PostMapping(path = "/comentario/editar")
    public ResponseEntity<Comentario> actualizarComentario(@RequestBody Comentario comentario){
        return comentarioService.actualizarComentario(comentario);
    }
    @PostMapping(path = "/comentario/eliminar")
    public ResponseEntity<String> eliminararComentario(@RequestParam Integer idComentario){
        return comentarioService.eliminarComentario(idComentario);
    }
}
