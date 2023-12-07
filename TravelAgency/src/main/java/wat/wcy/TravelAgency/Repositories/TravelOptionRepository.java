package wat.wcy.TravelAgency.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wat.wcy.TravelAgency.model.TravelOption;

import java.util.List;

@Repository
public interface TravelOptionRepository extends JpaRepository<TravelOption,Integer> {

    @Override
    List<TravelOption> findAll();

    @Override
    boolean existsById(Integer integer);

    @Override
    TravelOption save(TravelOption entity);

    @Override
    void delete(TravelOption entity);

    //TravelOption findByName(String name);

    //Optional<TravelOption> findAllByInTravel(boolean isInTravel);
}
