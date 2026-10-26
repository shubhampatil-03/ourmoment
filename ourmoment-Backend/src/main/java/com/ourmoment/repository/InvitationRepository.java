
package com.ourmoment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ourmoment.entity.Invitation;

public interface InvitationRepository
        extends JpaRepository<Invitation, Long> {

    List<Invitation> findByOwnerIdOrderByCreatedAtDesc(Long ownerId);

    Optional<Invitation> findByShareToken(String shareToken);
}
