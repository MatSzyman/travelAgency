package wat.wcy.TravelAgency.Logic;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import wat.wcy.TravelAgency.Repositories.ClientRepository;
import wat.wcy.TravelAgency.model.Client;

import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepo;


    public ClientService(ClientRepository clientRepo) {
        this.clientRepo = clientRepo;
    }

    private Client getUserDataFromToken() {
        // Get the authentication object from the security context
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            String userId = jwt.getClaimAsString("sub");
            String userName = jwt.getClaimAsString("given_name");
            String userLastName = jwt.getClaimAsString("family_name");
            String userEmail = jwt.getClaimAsString("email");

            List<String> userRolesList = jwt.getClaimAsStringList("roles");
            String userRolesString = String.join(",", userRolesList);

            return new Client(userId,userName,userLastName,userEmail,userRolesString);
        }

        // Handle the case where the token is not available or invalid
        throw new IllegalStateException("JWT token jest niepoprawny");
    }

    private String getRolesFromToken(){
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof Jwt){
            Jwt jwt = (Jwt) authentication.getPrincipal();

            List<String> userRolesList = jwt.getClaimAsStringList("roles");
            return String.join(",", userRolesList);
        }
        throw new IllegalStateException("JWT token jest niepoprawny");
    }

    public Client saveAsClientFromJWT(){
        Client client = getUserDataFromToken();
        if (client.getId() == null || client.getId().isEmpty()) {
            throw new IllegalStateException("Client ID is missing or invalid.");
        }
        return clientRepo.save(client);
    }

    public List<Client> getClients(){
        return clientRepo.findAll();
    }


    public String getClientRolesFromJWT() {
        return getRolesFromToken();
    }
}
