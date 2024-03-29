package wat.wcy.TravelAgency.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import wat.wcy.TravelAgency.model.FileData;

import java.util.List;
import java.util.Optional;

@Repository
public interface FileDataRepository extends JpaRepository<FileData,Integer> {

    Optional<FileData> findByName(String fileName);

    @Override
    Optional<FileData> findById(Integer integer);

    @Override
    List<FileData> findAll();

    @Override
    @Query("SELECT DISTINCT f FROM FileData f")
    List<FileData> findAllById(Iterable<Integer> integers);


}

