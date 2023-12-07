package wat.wcy.TravelAgency.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wat.wcy.TravelAgency.model.Insurance;

import java.util.List;
import java.util.Optional;

@Repository
public interface InsuranceRepository extends JpaRepository<Insurance,Integer> {

    @Override
    List<Insurance> findAll();

    @Override
    Optional<Insurance> findById(Integer integer);

    @Override
    boolean existsById(Integer integer);
}
