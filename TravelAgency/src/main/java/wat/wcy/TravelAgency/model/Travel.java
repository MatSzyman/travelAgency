package wat.wcy.TravelAgency.model;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "travel")
public class Travel {
    @Id
    @Column(name = "id", nullable = false)
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
    private Hotel hotel;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @OneToMany(mappedBy = "travel")
    private Set<TravelOption> travelOptions = new LinkedHashSet<>();

    public Set<TravelOption> getTravelOptions() {
        return travelOptions;
    }

    public void setTravelOptions(Set<TravelOption> travelOptions) {
        this.travelOptions = travelOptions;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public Instant getEndSeason() {
        return endSeason;
    }

    public void setEndSeason(Instant endSeason) {
        this.endSeason = endSeason;
    }

    public Instant getStartSeason() {
        return startSeason;
    }

    public void setStartSeason(Instant startSeason) {
        this.startSeason = startSeason;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}