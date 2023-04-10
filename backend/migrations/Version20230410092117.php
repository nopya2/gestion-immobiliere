<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230410092117 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE information DROP FOREIGN KEY FK_2979188316BE0BCF');
        $this->addSql('ALTER TABLE level DROP FOREIGN KEY FK_9AEACC1316BE0BCF');
        $this->addSql('ALTER TABLE level DROP FOREIGN KEY FK_9AEACC13680CAB68');
        $this->addSql('ALTER TABLE level DROP FOREIGN KEY FK_9AEACC135F4DC7F1');
        $this->addSql('ALTER TABLE level DROP FOREIGN KEY FK_9AEACC137A45AADA');
        $this->addSql('ALTER TABLE level DROP FOREIGN KEY FK_9AEACC1364E4A98C');
        $this->addSql('ALTER TABLE faculty DROP FOREIGN KEY FK_17966043AE80F5DF');
        $this->addSql('ALTER TABLE faculty DROP FOREIGN KEY FK_1796604316BE0BCF');
        $this->addSql('ALTER TABLE etablishment DROP FOREIGN KEY FK_5FB71052783E3463');
        $this->addSql('ALTER TABLE etablishment DROP FOREIGN KEY FK_5FB71052F98F144A');
        $this->addSql('ALTER TABLE symfony_demo_comment DROP FOREIGN KEY FK_53AD8F834B89032C');
        $this->addSql('ALTER TABLE symfony_demo_comment DROP FOREIGN KEY FK_53AD8F83F675F31B');
        $this->addSql('ALTER TABLE academic_year DROP FOREIGN KEY FK_275AE72116BE0BCF');
        $this->addSql('ALTER TABLE manager DROP FOREIGN KEY FK_FA2425B98C03F15C');
        $this->addSql('ALTER TABLE symfony_demo_post_tag DROP FOREIGN KEY FK_6ABC1CC44B89032C');
        $this->addSql('ALTER TABLE symfony_demo_post_tag DROP FOREIGN KEY FK_6ABC1CC4BAD26311');
        $this->addSql('ALTER TABLE employee DROP FOREIGN KEY FK_5D9F75A116BE0BCF');
        $this->addSql('ALTER TABLE employee DROP FOREIGN KEY FK_5D9F75A1BF396750');
        $this->addSql('ALTER TABLE learner DROP FOREIGN KEY FK_8EF38343D751045');
        $this->addSql('ALTER TABLE learner_parent DROP FOREIGN KEY FK_1F88FBAC3B7323CB');
        $this->addSql('ALTER TABLE diploma DROP FOREIGN KEY FK_EC21895716BE0BCF');
        $this->addSql('ALTER TABLE symfony_demo_post DROP FOREIGN KEY FK_58A92E65F675F31B');
        $this->addSql('ALTER TABLE level_type DROP FOREIGN KEY FK_E5FBAC385EC1162');
        $this->addSql('ALTER TABLE level_type DROP FOREIGN KEY FK_E5FBAC3816BE0BCF');
        $this->addSql('ALTER TABLE cycle DROP FOREIGN KEY FK_B086D19316BE0BCF');
        $this->addSql('ALTER TABLE faculty_diploma DROP FOREIGN KEY FK_AD325F0D680CAB68');
        $this->addSql('ALTER TABLE faculty_diploma DROP FOREIGN KEY FK_AD325F0DA99ACEB5');
        $this->addSql('DROP TABLE level');
        $this->addSql('DROP TABLE phone');
        $this->addSql('DROP TABLE faculty');
        $this->addSql('DROP TABLE etablishment');
        $this->addSql('DROP TABLE symfony_demo_comment');
        $this->addSql('DROP TABLE academic_year');
        $this->addSql('DROP TABLE manager');
        $this->addSql('DROP TABLE symfony_demo_post_tag');
        $this->addSql('DROP TABLE symfony_demo_tag');
        $this->addSql('DROP TABLE employee');
        $this->addSql('DROP TABLE learner');
        $this->addSql('DROP TABLE learner_parent');
        $this->addSql('DROP TABLE department');
        $this->addSql('DROP TABLE diploma');
        $this->addSql('DROP TABLE symfony_demo_post');
        $this->addSql('DROP TABLE level_type');
        $this->addSql('DROP TABLE cycle');
        $this->addSql('DROP TABLE faculty_diploma');
        $this->addSql('DROP TABLE test_app');
        $this->addSql('ALTER TABLE customer DROP firstname');
        $this->addSql('DROP INDEX UNIQ_2979188316BE0BCF ON information');
        $this->addSql('ALTER TABLE information DROP etablishment_id');
        $this->addSql('ALTER TABLE user DROP discr');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE level (id INT AUTO_INCREMENT NOT NULL, faculty_id INT NOT NULL, etablishment_id INT NOT NULL, obtained_diploma_id INT DEFAULT NULL, prepared_diploma_id INT NOT NULL, level_type_id INT DEFAULT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, description LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, code VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', duration INT NOT NULL, INDEX IDX_9AEACC135F4DC7F1 (prepared_diploma_id), INDEX IDX_9AEACC13680CAB68 (faculty_id), INDEX IDX_9AEACC1364E4A98C (level_type_id), INDEX IDX_9AEACC1316BE0BCF (etablishment_id), INDEX IDX_9AEACC137A45AADA (obtained_diploma_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE phone (id INT AUTO_INCREMENT NOT NULL, phone_number VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE faculty (id INT AUTO_INCREMENT NOT NULL, etablishment_id INT DEFAULT NULL, department_id INT DEFAULT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, description LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, code VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, UNIQUE INDEX UNIQ_179660435E237E06 (name), INDEX IDX_1796604316BE0BCF (etablishment_id), INDEX IDX_17966043AE80F5DF (department_id), UNIQUE INDEX UNIQ_1796604377153098 (code), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE etablishment (id INT AUTO_INCREMENT NOT NULL, logo_id INT DEFAULT NULL, manager_id INT DEFAULT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, email VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, address LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, city VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, country VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, website VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, created_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', phones LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:array)\', etablishment_type VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, postal_box VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, UNIQUE INDEX UNIQ_5FB710525E237E06 (name), UNIQUE INDEX UNIQ_5FB71052F98F144A (logo_id), UNIQUE INDEX UNIQ_5FB71052783E3463 (manager_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE symfony_demo_comment (id INT AUTO_INCREMENT NOT NULL, post_id INT NOT NULL, author_id INT NOT NULL, content LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, published_at DATETIME NOT NULL, INDEX IDX_53AD8F834B89032C (post_id), INDEX IDX_53AD8F83F675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE academic_year (id INT AUTO_INCREMENT NOT NULL, etablishment_id INT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, start_date DATE NOT NULL, end_date DATE NOT NULL, created_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_275AE72116BE0BCF (etablishment_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE manager (id INT AUTO_INCREMENT NOT NULL, employee_id INT DEFAULT NULL, UNIQUE INDEX UNIQ_FA2425B98C03F15C (employee_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE symfony_demo_post_tag (post_id INT NOT NULL, tag_id INT NOT NULL, INDEX IDX_6ABC1CC44B89032C (post_id), INDEX IDX_6ABC1CC4BAD26311 (tag_id), PRIMARY KEY(post_id, tag_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE symfony_demo_tag (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, UNIQUE INDEX UNIQ_4D5855405E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE employee (id INT NOT NULL, etablishment_id INT DEFAULT NULL, INDEX IDX_5D9F75A116BE0BCF (etablishment_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE learner (id INT AUTO_INCREMENT NOT NULL, identity_photo_id INT DEFAULT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, firstname VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, birthdate DATE NOT NULL, birthplace VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, sex VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, address LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, postal_box VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, email VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, district VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, registration_number VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', UNIQUE INDEX UNIQ_8EF383438CEDFBE (registration_number), UNIQUE INDEX UNIQ_8EF38343D751045 (identity_photo_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE learner_parent (id INT AUTO_INCREMENT NOT NULL, phone_id INT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, firstname VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, relationship VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, UNIQUE INDEX UNIQ_1F88FBAC3B7323CB (phone_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE department (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, code VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, description LONGTEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE diploma (id INT AUTO_INCREMENT NOT NULL, etablishment_id INT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, description LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, duration INT NOT NULL, INDEX IDX_EC21895716BE0BCF (etablishment_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE symfony_demo_post (id INT AUTO_INCREMENT NOT NULL, author_id INT NOT NULL, title VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, slug VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, summary VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, content LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, published_at DATETIME NOT NULL, INDEX IDX_58A92E65F675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE level_type (id INT AUTO_INCREMENT NOT NULL, etablishment_id INT DEFAULT NULL, cycle_id INT DEFAULT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, code VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, level VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, INDEX IDX_E5FBAC3816BE0BCF (etablishment_id), INDEX IDX_E5FBAC385EC1162 (cycle_id), UNIQUE INDEX UNIQ_E5FBAC385E237E06 (name), UNIQUE INDEX UNIQ_E5FBAC3877153098 (code), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE cycle (id INT AUTO_INCREMENT NOT NULL, etablishment_id INT DEFAULT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, description LONGTEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_B086D19316BE0BCF (etablishment_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE faculty_diploma (faculty_id INT NOT NULL, diploma_id INT NOT NULL, INDEX IDX_AD325F0D680CAB68 (faculty_id), INDEX IDX_AD325F0DA99ACEB5 (diploma_id), PRIMARY KEY(faculty_id, diploma_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE test_app (id INT AUTO_INCREMENT NOT NULL, version VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE level ADD CONSTRAINT FK_9AEACC1316BE0BCF FOREIGN KEY (etablishment_id) REFERENCES etablishment (id)');
        $this->addSql('ALTER TABLE level ADD CONSTRAINT FK_9AEACC13680CAB68 FOREIGN KEY (faculty_id) REFERENCES faculty (id)');
        $this->addSql('ALTER TABLE level ADD CONSTRAINT FK_9AEACC135F4DC7F1 FOREIGN KEY (prepared_diploma_id) REFERENCES diploma (id)');
        $this->addSql('ALTER TABLE level ADD CONSTRAINT FK_9AEACC137A45AADA FOREIGN KEY (obtained_diploma_id) REFERENCES diploma (id)');
        $this->addSql('ALTER TABLE level ADD CONSTRAINT FK_9AEACC1364E4A98C FOREIGN KEY (level_type_id) REFERENCES level_type (id)');
        $this->addSql('ALTER TABLE faculty ADD CONSTRAINT FK_17966043AE80F5DF FOREIGN KEY (department_id) REFERENCES department (id)');
        $this->addSql('ALTER TABLE faculty ADD CONSTRAINT FK_1796604316BE0BCF FOREIGN KEY (etablishment_id) REFERENCES etablishment (id)');
        $this->addSql('ALTER TABLE etablishment ADD CONSTRAINT FK_5FB71052783E3463 FOREIGN KEY (manager_id) REFERENCES manager (id)');
        $this->addSql('ALTER TABLE etablishment ADD CONSTRAINT FK_5FB71052F98F144A FOREIGN KEY (logo_id) REFERENCES image (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE symfony_demo_comment ADD CONSTRAINT FK_53AD8F834B89032C FOREIGN KEY (post_id) REFERENCES symfony_demo_post (id)');
        $this->addSql('ALTER TABLE symfony_demo_comment ADD CONSTRAINT FK_53AD8F83F675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE academic_year ADD CONSTRAINT FK_275AE72116BE0BCF FOREIGN KEY (etablishment_id) REFERENCES etablishment (id)');
        $this->addSql('ALTER TABLE manager ADD CONSTRAINT FK_FA2425B98C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id)');
        $this->addSql('ALTER TABLE symfony_demo_post_tag ADD CONSTRAINT FK_6ABC1CC44B89032C FOREIGN KEY (post_id) REFERENCES symfony_demo_post (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE symfony_demo_post_tag ADD CONSTRAINT FK_6ABC1CC4BAD26311 FOREIGN KEY (tag_id) REFERENCES symfony_demo_tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A116BE0BCF FOREIGN KEY (etablishment_id) REFERENCES etablishment (id)');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A1BF396750 FOREIGN KEY (id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE learner ADD CONSTRAINT FK_8EF38343D751045 FOREIGN KEY (identity_photo_id) REFERENCES image (id)');
        $this->addSql('ALTER TABLE learner_parent ADD CONSTRAINT FK_1F88FBAC3B7323CB FOREIGN KEY (phone_id) REFERENCES phone (id)');
        $this->addSql('ALTER TABLE diploma ADD CONSTRAINT FK_EC21895716BE0BCF FOREIGN KEY (etablishment_id) REFERENCES etablishment (id)');
        $this->addSql('ALTER TABLE symfony_demo_post ADD CONSTRAINT FK_58A92E65F675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE level_type ADD CONSTRAINT FK_E5FBAC385EC1162 FOREIGN KEY (cycle_id) REFERENCES cycle (id)');
        $this->addSql('ALTER TABLE level_type ADD CONSTRAINT FK_E5FBAC3816BE0BCF FOREIGN KEY (etablishment_id) REFERENCES etablishment (id)');
        $this->addSql('ALTER TABLE cycle ADD CONSTRAINT FK_B086D19316BE0BCF FOREIGN KEY (etablishment_id) REFERENCES etablishment (id)');
        $this->addSql('ALTER TABLE faculty_diploma ADD CONSTRAINT FK_AD325F0D680CAB68 FOREIGN KEY (faculty_id) REFERENCES faculty (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE faculty_diploma ADD CONSTRAINT FK_AD325F0DA99ACEB5 FOREIGN KEY (diploma_id) REFERENCES diploma (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE customer ADD firstname VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD discr VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE information ADD etablishment_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE information ADD CONSTRAINT FK_2979188316BE0BCF FOREIGN KEY (etablishment_id) REFERENCES etablishment (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_2979188316BE0BCF ON information (etablishment_id)');
    }
}
