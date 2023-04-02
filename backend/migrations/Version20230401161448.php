<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230401161448 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE department (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, code VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE type_construction (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE type_produit (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE faculty ADD department_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE faculty ADD CONSTRAINT FK_17966043AE80F5DF FOREIGN KEY (department_id) REFERENCES department (id)');
        $this->addSql('CREATE INDEX IDX_17966043AE80F5DF ON faculty (department_id)');
        $this->addSql('ALTER TABLE level_type ADD cycle_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE level_type ADD CONSTRAINT FK_E5FBAC385EC1162 FOREIGN KEY (cycle_id) REFERENCES cycle (id)');
        $this->addSql('CREATE INDEX IDX_E5FBAC385EC1162 ON level_type (cycle_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE faculty DROP FOREIGN KEY FK_17966043AE80F5DF');
        $this->addSql('DROP TABLE department');
        $this->addSql('DROP TABLE type_construction');
        $this->addSql('DROP TABLE type_produit');
        $this->addSql('DROP INDEX IDX_17966043AE80F5DF ON faculty');
        $this->addSql('ALTER TABLE faculty DROP department_id');
        $this->addSql('ALTER TABLE level_type DROP FOREIGN KEY FK_E5FBAC385EC1162');
        $this->addSql('DROP INDEX IDX_E5FBAC385EC1162 ON level_type');
        $this->addSql('ALTER TABLE level_type DROP cycle_id');
    }
}
