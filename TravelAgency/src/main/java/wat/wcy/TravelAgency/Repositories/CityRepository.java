package wat.wcy.TravelAgency.Repositories;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wat.wcy.TravelAgency.model.City;

import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City,Integer> {

    @Override
    List<City> findAll(Sort sort);

    List<City> findAllByInCountry(boolean isInCountry);

    City findByName(String name);

    @Override
    boolean existsById(Integer integer);
}
