package wat.wcy.TravelAgency.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wat.wcy.TravelAgency.model.AirlineCompany;

import java.util.List;
import java.util.Optional;

@Repository
public interface AirlineCompanyRepository extends JpaRepository<AirlineCompany,Integer> {

    @Override
    List<AirlineCompany> findAll();

    @Override
    Optional<AirlineCompany> findById(Integer integer);

    @Override
    boolean existsById(Integer integer);


    //Chuj wi co to, moze sie przyda pozniej
    /*@Override
    <S extends AirlineCompany> boolean exists(Example<S> example);*/
}

