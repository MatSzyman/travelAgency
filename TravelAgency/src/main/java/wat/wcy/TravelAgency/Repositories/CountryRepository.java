package wat.wcy.TravelAgency.Repositories;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import wat.wcy.TravelAgency.model.Country;

import java.util.List;
import java.util.Optional;

public interface CountryRepository extends JpaRepository<Country,Integer> {

    @Override
    List<Country> findAll(Sort sort);

    @Override
    Optional<Country> findById(Integer integer);

    Country findByName(String name);

    @Override
    boolean existsById(Integer integer);

    boolean existsByName(String name);
}
