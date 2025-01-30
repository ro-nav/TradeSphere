package com.tradingapp.P04Auth.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "roles")
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "role_id")
	private Integer roleId;

	@Column(name = "type")
	private String type;

	@OneToMany(mappedBy = "role", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private Set<User> users = new HashSet<>();

	public Role() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Role(Integer roleId, String type, Set<User> users) {
		super();
		this.roleId = roleId;
		this.type = type;
		this.users = users;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	// Convenience method to add a user
	public void addUser(User user) {
		users.add(user);
		user.setRole(this);
	}

	// Convenience method to remove a user
	public void removeUser(User user) {
		users.remove(user);
		user.setRole(null);
	}
}

