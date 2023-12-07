package wat.wcy.TravelAgency.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wat.wcy.TravelAgency.model.Hotel;

import java.util.List;
import java.util.Optional;

@Repository
public interface HotelRepository extends JpaRepository<Hotel,Integer> {

    @Override
    List<Hotel> findAll();

    @Override
    Optional<Hotel> findById(Integer integer);

    //List<Hotel> findAllByInCity(boolean isInCity);

    //Hotel findByName(String name);

    @Override
    boolean existsById(Integer integer);

    @Override
    Hotel save(Hotel entity);

    @Override
    void delete(Hotel entity);


}
