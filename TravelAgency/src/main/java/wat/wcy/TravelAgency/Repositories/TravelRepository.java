package wat.wcy.TravelAgency.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wat.wcy.TravelAgency.model.Travel;

import java.util.List;
import java.util.Optional;

@Repository
public interface  TravelRepository extends JpaRepository<Travel, Integer> {

    @Override
    List<Travel> findAll();

    @Override
    boolean existsById(Integer integer);

    @Override
    Optional<Travel> findById(Integer integer);

    @Override
    Travel save(Travel entity);

    @Override
    void delete(Travel entity);

    Travel findByName(String name);

    //Optional<Travel> findAllByInCity(boolean isInCity);
}
