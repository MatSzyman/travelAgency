package wat.wcy.TravelAgency.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import wat.wcy.TravelAgency.model.Country;

import java.util.List;
import java.util.Optional;

public interface CountryRepository extends JpaRepository<Country,Integer> {


    @Query("SELECT cr FROM Country cr LEFT JOIN FETCH cr.cities")
    List<Country> findAllWithCities();

    @Override
    Optional<Country> findById(Integer integer);

    Country findByName(String name);

    @Override
    boolean existsById(Integer integer);

    boolean existsByName(String name);
}
