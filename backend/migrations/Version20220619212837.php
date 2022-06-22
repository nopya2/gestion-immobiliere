<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220619212837 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE privilege (id INT AUTO_INCREMENT NOT NULL, module_id INT NOT NULL, permission_id INT NOT NULL, INDEX IDX_87209A87AFC2B591 (module_id), INDEX IDX_87209A87FED90CCA (permission_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE privilege ADD CONSTRAINT FK_87209A87AFC2B591 FOREIGN KEY (module_id) REFERENCES module (id)');
        $this->addSql('ALTER TABLE privilege ADD CONSTRAINT FK_87209A87FED90CCA FOREIGN KEY (permission_id) REFERENCES permission (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE privilege');
    }
}
