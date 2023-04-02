<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230402002634 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE owner ADD user_id INT NOT NULL, ADD name VARCHAR(255) NOT NULL, ADD firstname VARCHAR(255) DEFAULT NULL, ADD contact VARCHAR(255) NOT NULL, ADD address LONGTEXT NOT NULL, ADD email VARCHAR(255) DEFAULT NULL, ADD created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE lastname num_folder VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE owner ADD CONSTRAINT FK_CF60E67CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_CF60E67C55835E75 ON owner (num_folder)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_CF60E67CE7927C74 ON owner (email)');
        $this->addSql('CREATE INDEX IDX_CF60E67CA76ED395 ON owner (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE owner DROP FOREIGN KEY FK_CF60E67CA76ED395');
        $this->addSql('DROP INDEX UNIQ_CF60E67C55835E75 ON owner');
        $this->addSql('DROP INDEX UNIQ_CF60E67CE7927C74 ON owner');
        $this->addSql('DROP INDEX IDX_CF60E67CA76ED395 ON owner');
        $this->addSql('ALTER TABLE owner ADD lastname VARCHAR(255) NOT NULL, DROP user_id, DROP num_folder, DROP name, DROP firstname, DROP contact, DROP address, DROP email, DROP created_at, DROP updated_at');
    }
}
