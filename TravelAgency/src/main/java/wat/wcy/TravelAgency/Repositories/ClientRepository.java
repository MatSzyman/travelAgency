package wat.wcy.TravelAgency.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wat.wcy.TravelAgency.model.Client;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client,Integer> {

    @Override
    boolean existsById(Integer integer);

    @Override
    Optional<Client> findById(Integer integer);

    @Override
    Client save(Client entity);


}
