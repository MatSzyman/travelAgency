package wat.wcy.TravelAgency.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import wat.wcy.TravelAgency.model.City;

import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City,Integer> {

    @Query("SELECT c FROM City c LEFT JOIN FETCH c.hotels")
    List<City> findAllWithHotels();

   // @Query("SELECT c FROM City c LEFT JOIN FETCH c.hotels WHERE c.name = :name")
    List<City> findAllByCountry_Name(String name);

    City findByName(String name);

    @Override
    boolean existsById(Integer integer);
}
