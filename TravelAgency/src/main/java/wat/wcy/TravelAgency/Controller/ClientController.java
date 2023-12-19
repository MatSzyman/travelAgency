package wat.wcy.TravelAgency.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wat.wcy.TravelAgency.Logic.ClientService;
import wat.wcy.TravelAgency.model.Client;

import java.util.List;

@RequestMapping(value = "/Client")
@RestController
public class ClientController {

    ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping
    ResponseEntity<Client> addNewClient(){
        return ResponseEntity.ok(clientService.saveAsClientFromJWT());
    }

    @GetMapping(path = "/All")
    ResponseEntity<List<Client>> showClients(){
        return ResponseEntity.ok(clientService.getClients());
    }

}
