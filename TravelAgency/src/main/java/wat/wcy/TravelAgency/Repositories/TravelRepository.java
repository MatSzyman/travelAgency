package wat.wcy.TravelAgency.Repositories;

import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import wat.wcy.TravelAgency.model.Travel;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface  TravelRepository extends JpaRepository<Travel, Integer> {

    @Query("SELECT DISTINCT t FROM Travel t LEFT JOIN FETCH t.hotel h LEFT JOIN FETCH t.city c LEFT JOIN FETCH t.travelOptions tr ")
    @Override
    List<Travel> findAll();

    @Nonnull //w returnie nie moze byc nulla
    @Override
    Page<Travel> findAll(@Nonnull Pageable pageable); //argument nie moze byc nullem

    Page<Travel>findByCityNameIn(Collection<String> cityNames, Pageable pageable);

    //@Nonnull
    @Query("SELECT t FROM Travel t WHERE" +
            " (:cityNames IS NULL OR t.city.name IN :cityNames)" +
            " AND (:starsCount IS NULL OR t.hotel.starsCount = :starsCount)" +
            " AND (:minPrice IS NULL OR t.hotel.price > :minPrice)" +
            " AND (:maxPrice IS NULL OR t.hotel.price < :maxPrice)")

    Page<Travel>findByCityNameInAndOptionalHotelStarsCountAndMinHotelPriceAndMaxHotelPrice(
            @Param("cityNames") Optional<List<String>> cityNames,
            @Param("starsCount") Optional<Integer> starsCount,
            @Param("maxPrice") Optional<Double> maxPrice,
            @Param("minPrice") Optional<Double> minPrice,
            Pageable pageable
    );

    @Override
    boolean existsById(Integer integer);

    @Nonnull
    @Override
    Optional<Travel> findById(@Nonnull Integer integer);

    @Override
    Travel save(Travel entity);

    @Override
    void deleteById(@Nonnull Integer integer);



    Travel findByName(String name);

}
