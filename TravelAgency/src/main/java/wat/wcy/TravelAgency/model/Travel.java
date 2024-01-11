package wat.wcy.TravelAgency.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import java.time.Instant;
import java.util.Objects;
import java.util.Set;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "travel")
public class Travel {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "base_price", nullable = false)
    private Double basePrice;

    @Column(name = "description", nullable = false, length = 100)
    private String description;

    @Column(name = "start_season", nullable = false)
    private Instant startSeason;

    @Column(name = "end_season", nullable = false)
    private Instant endSeason;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "hotel_id", nullable = false)
    @ToString.Exclude
    private Hotel hotel;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "city_id", nullable = false)
    @ToString.Exclude
    private City city;

    @OneToMany(mappedBy = "travel")
    @ToString.Exclude
    private Set<TravelOption> travelOptions;

    @Column(name = "file_data_id", nullable = true)
    private Integer fileDataId; // ID reference to FileData

    public Travel(String name, Double basePrice, String description, Instant startSeason, Instant endSeason, Hotel hotel, City city) {
        this.name = name;
        this.basePrice = basePrice;
        this.description = description;
        this.startSeason = startSeason;
        this.endSeason = endSeason;
        this.hotel = hotel;
        this.city = city;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Travel travel = (Travel) o;
        return id != null && Objects.equals(id, travel.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}