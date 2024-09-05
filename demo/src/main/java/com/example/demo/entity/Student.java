package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;


@Entity
@NoArgsConstructor
@CrossOrigin
public class Student {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String studentName;

    public Student(Long id, String studentName, String studentEmail, String studentAddress) {
        this.id = id;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.studentAddress = studentAddress;
    }

    private String studentEmail;

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", studentName='" + studentName + '\'' +
                ", studentEmail='" + studentEmail + '\'' +
                ", studentAddress='" + studentAddress + '\'' +
                '}';
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getStudentAddress() {
        return studentAddress;
    }

    public void setStudentAddress(String studentAddress) {
        this.studentAddress = studentAddress;
    }

    private String studentAddress;
}
