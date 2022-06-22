<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220619214102 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE role (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE role_privilege (role_id INT NOT NULL, privilege_id INT NOT NULL, INDEX IDX_D6D4495BD60322AC (role_id), INDEX IDX_D6D4495B32FB8AEA (privilege_id), PRIMARY KEY(role_id, privilege_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE role_privilege ADD CONSTRAINT FK_D6D4495BD60322AC FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE role_privilege ADD CONSTRAINT FK_D6D4495B32FB8AEA FOREIGN KEY (privilege_id) REFERENCES privilege (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE role_privilege DROP FOREIGN KEY FK_D6D4495BD60322AC');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE role_privilege');
    }
}
