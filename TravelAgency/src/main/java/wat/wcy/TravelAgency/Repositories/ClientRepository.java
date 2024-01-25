package wat.wcy.TravelAgency.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wat.wcy.TravelAgency.model.Client;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client,String> {

    @Override
    boolean existsById(String id);


    @Override
    Optional<Client> findById(String id);

    @Override
    Client save(Client entity);

}
