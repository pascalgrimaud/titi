package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * The Conference entity.\n@author A true hipster
 */
@ApiModel(description = "The Conference entity.\n@author A true hipster")
@Entity
@Table(name = "conference")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Conference implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * fieldName
     */
    @ApiModelProperty(value = "fieldName")
    @Column(name = "name")
    private String name;

    @Column(name = "schedule")
    private Instant schedule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("conferences")
    private Speaker speaker;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Conference name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getSchedule() {
        return schedule;
    }

    public Conference schedule(Instant schedule) {
        this.schedule = schedule;
        return this;
    }

    public void setSchedule(Instant schedule) {
        this.schedule = schedule;
    }

    public Speaker getSpeaker() {
        return speaker;
    }

    public Conference speaker(Speaker speaker) {
        this.speaker = speaker;
        return this;
    }

    public void setSpeaker(Speaker speaker) {
        this.speaker = speaker;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Conference)) {
            return false;
        }
        return id != null && id.equals(((Conference) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Conference{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", schedule='" + getSchedule() + "'" +
            "}";
    }
}
